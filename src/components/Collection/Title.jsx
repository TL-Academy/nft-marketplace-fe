const Title = (props) => {
    
    return (
        
        <div className="flex flex-col">
            <span className="font-bold text-base dark:text-white">{props.data}</span>
            <span className="text-slate-600 text-base font-semibold dark:text-white">{props.text}</span>
        </div>
    );
}

export default Title;