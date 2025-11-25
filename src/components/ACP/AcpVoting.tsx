
// Components
import { StageIdle } from './Voting/StageIdle';
import { StageVoting } from './Voting/StageVoting';
import { StageResults } from './Voting/StageResults';
import { StagePerforming } from './Voting/StagePerforming';

export const AcpVoting = () => (
    <div className="p-2">
        <div className="flex flex-col gap-2">
            <StageIdle />

            <StagePerforming />

            <StageVoting />

            <StageResults />
        </div>
    </div>
);