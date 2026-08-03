import React from 'react'

export interface UserInformationTileProps {
    user: {
        id: string;
        username: string;
    };
    signout: () => void;
}

const UserInformationTile = ({ user , signout }: UserInformationTileProps) => {
  return (
        <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">
                        Welcome,{" "}
                        <span className="font-bold text-blue-500">
                            {user.username ?? "there"}
                        </span>
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400">
                        This is your Home dashboard — access features here and
                        manage your account.,
                    </p>
                </div>

                <button
                    onClick={signout}
                    className="shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                    Sign Out
                </button>
            </div>
        </div>
  )
}

export default UserInformationTile