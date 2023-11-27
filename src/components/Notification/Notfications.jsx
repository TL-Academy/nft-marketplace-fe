import { useSelector } from 'react-redux'
import { selectNotifications, selectResolved } from '../../app/notification';
import ResolvedTimeOut from './ResolvedTimeOut';

export default function Notifications() {

    const notifications = useSelector(selectNotifications);
    const resolved = useSelector(selectResolved);

    const renderNotifications = Object.values(notifications).map(v => {
        return <p className="break-words w-full animate-pulse text-center">{v}</p>
    })

    const renderResolved = Object.entries(resolved).map(([k, v]) => {
        return <ResolvedTimeOut signature={k} message={v} />
    })

    function loadingTransactions() {
        return (
            <>
                {
                    Object.values(notifications).length > 0
                    &&
                    <div className="flex flex-col gap-2 pb-2 w-full items-center">
                        <p className="text-lg border-b border-gray-900 w-fit">Active Transactions:</p>
                        {renderNotifications}
                    </div>
                }
            </>
        )
    }

    return (
        <div className="absolute top-0 mx-auto sticky bg-gray-100 opacity-50 z-10 px-6 flex flx-col w-full flex flex-col gap-2">
            {loadingTransactions()}
            <div className='flex flex-col gap-2 items-center'>
                {renderResolved}
            </div>
        </div>
    )
}