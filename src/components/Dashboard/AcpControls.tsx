import classNames from 'classnames';
import { NavLink } from 'react-router';
import { HiOutlineHome } from "react-icons/hi";
import { PiStar, PiUsers, PiGearSix } from "react-icons/pi";

// Shared
import { glassStyles } from 'src/shared';

const tabCls = "h-12 flex flex-auto p-1.5 items-stretch justify-center";
const tabInnerCls = "flex flex-1 items-center justify-center rounded-[10px] select-none cursor-pointer";

export const AcpControls = () => {
    return (
        <div
            className="flex justify-between items-stretch flex-nowrap m-2 overflow-hidden"
            style={{
                ...glassStyles,
                border: 'none',
                borderRadius: 12
            }}
        >
            <div className={tabCls}>
                <NavLink
                    to="/"
                    className={({ isActive }) => classNames(tabInnerCls, {
                        ['bg-white/20']: isActive,
                    })}
                >
                    {({ isTransitioning, isPending }) => (
                        !isTransitioning && !isPending ? <HiOutlineHome size={20} /> : <div className="loading loading-spinner loading-sm" />
                    )}
                </NavLink>
            </div>

            <div className={tabCls}>
                <NavLink
                    to="/acp-users"
                    className={({ isActive }) => classNames(tabInnerCls, {
                        ['bg-white/20']: isActive,
                    })}
                >
                    {({ isTransitioning, isPending }) => (
                        !isTransitioning && !isPending ? <PiUsers size={20} /> : <div className="loading loading-spinner loading-sm" />
                    )}
                </NavLink>
            </div>

            <div className={tabCls}>
                <NavLink
                    to="/acp-stars"
                    className={({ isActive }) => classNames(tabInnerCls, {
                        ['bg-white/20']: isActive,

                    })}
                >
                    {({ isTransitioning, isPending }) => (
                        !isTransitioning && !isPending ? <PiStar size={20} /> : <div className="loading loading-spinner loading-sm" />
                    )}
                </NavLink>
            </div>

            <div className={tabCls}>
                <NavLink
                    to="/acp-voting"
                    className={({ isActive }) => classNames(tabInnerCls, {
                        ['bg-white/20']: isActive,

                    })}
                >
                    {({ isTransitioning, isPending }) => (
                        !isTransitioning && !isPending ? <PiGearSix size={20} /> : <div className="loading loading-spinner loading-sm" />
                    )}
                </NavLink>
            </div>
        </div>
    );
};