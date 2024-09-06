
export default function LoadingClock () {
    return(
        <div className="loadingClock">
            <div className="clock">
                <div className="center"></div>
                <div className="hour"></div>
                <div className="minute"></div>
                <div className="second"></div>
            </div>
            <span>Loading...</span>
        </div>
    )
}
