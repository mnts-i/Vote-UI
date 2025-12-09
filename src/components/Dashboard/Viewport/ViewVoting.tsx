import classNames from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// State
import { logout } from 'src/state/slice/app.slice';
import { useAppDispatch, useAppSelector } from 'src/state/store';
import { useLazyMyVoteQuery, useVoteMutation } from 'src/state/api/appApi';

// Components
import { StarFrame } from './StarFrame';
import toast from 'react-hot-toast';

export const ViewVoting = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.app.user);
    const backendState = useAppSelector(state => state.app.backendState);

    const [vote, { data: voteResponse, isLoading: isVoting }] = useVoteMutation();
    const [fetchMyVote, { data: rating, isFetching: isFetchingVote }] = useLazyMyVoteQuery();

    const starId = backendState.stage === 'VOTING' ? backendState.star.id : null;

    useEffect(() => {
        if (!user) {
            dispatch(logout());
            navigate('/');
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (!voteResponse) {
            return;
        }

        typeof voteResponse.error === 'string'
            ? toast(voteResponse.error, { id: 'voting', icon: '😟' })
            : toast('Η ψήφος σου καταχωρήθηκε!', { id: 'voting', icon: '😎' });
    }, [voteResponse]);

    useEffect(() => {
        if (user && typeof starId === 'number') {
            console.log('Fetching personal vote for star: ' + starId);
            fetchMyVote({ starId, token: user.token }, false);
        }
    }, [starId, user]);

    const cannotVote = isFetchingVote || isVoting;

    if (backendState.stage !== 'VOTING' || !user) {
        return null;
    }

    const star = backendState.star;

    const onRatingChange = (score: number) => {
        if (isVoting) { return; }

        const payload = {
            starId: star.id,
            token: user.token,
            score,
        };

        vote(payload);
    };

    return (
        <div className="flex flex-col gap-5 w-full items-center justify-center">
            <StarFrame star={backendState.star} />

            <div className="flex h-16 pl-3.5 pr-18 mt-9 items-center bg-black/25 relative rounded-full">
                <div className="rating rating-xl rating-half">
                    <input type="radio" name="rating-007-baby" className="rating-hidden" defaultChecked />
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, idx) => (
                        <input
                            key={value}
                            type="radio"
                            name="rating-007-baby"
                            className={classNames('mask mask-star-2 bg-orange-400', {
                                'mask-half-1': idx % 2 === 0,
                                'mask-half-2': idx % 2 !== 0,
                            })}
                            disabled={cannotVote}
                            checked={typeof rating === 'number' && rating === value}
                            onChange={() => onRatingChange(value)}
                            aria-label={`${value / 2} star`}
                        />
                    ))}
                </div>

                <div className="flex h-[76px] w-[76px] items-center justify-center absolute -top-2 -right-5 bg-primary rounded-full ring-3 ring-purple-800/50">
                    {!cannotVote && (
                        <span className="text-[36px] font-black text-purple-100 font-[Spicy_Sale]">
                            {typeof rating === 'number' ? rating / 2 : '--'}
                        </span>
                    )}

                    {cannotVote && (
                        <div
                            className="loading loading-ring loading-xl text-white"
                        />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-0 pt-3 justify-center items-center">
                <div className="text-2xl font-semibold text-gray-200 text-center">
                    {star.name}
                </div>

                {star.field && (
                    <span className="text-sm text-gray-400">
                        {star.field}
                    </span>
                )}
            </div>
        </div >
    );
};