import { useSelector, useDispatch } from 'react-redux'
import { selectNotifications, removeNotification, firstNotification } from '../../app/notification';
import { useEffect } from 'react';

export default function Notifications() {

    const notifications = useSelector(selectNotifications);
    const _firstNotification = useSelector(firstNotification)
    const dispatch = useDispatch();

    useEffect(() => {
        if (_firstNotification) {
            const timeoutId = setTimeout(() => {
                dispatch(removeNotification());
            }, _firstNotification.timeout);
            return () => clearTimeout(timeoutId);
        }
    }, [notifications])

    return (
        <>
            {
                _firstNotification &&
                <p
                    className="absolute top-0 mx-auto sticky bg-gray-100 opacity-50 z-10 text-center"
                >
                    {_firstNotification.message} - {_firstNotification.status}
                </p>
            }
        </>
    )
}