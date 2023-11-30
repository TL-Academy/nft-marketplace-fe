import { useSelector, useDispatch } from 'react-redux'
import { selectNotifications, removeNotification } from '../../app/notification';
import { useEffect } from 'react';

export default function Notifications() {

    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (notifications.length != 0) {
                dispatch(removeNotification());
            }
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [notifications])

    return (
        <>
            {
                notifications.length != 0 &&
                <p 
                    className="absolute top-0 mx-auto sticky bg-gray-100 opacity-50 z-10 text-center"
                >
                    {notifications[0].message} - {notifications[0].status}
                </p>
            }
        </>
    )
}