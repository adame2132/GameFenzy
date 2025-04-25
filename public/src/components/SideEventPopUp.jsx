export default function SidePopup({ event, onClose }) {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-30 flex">
            <div
                className="absolute w-full h-full bg-black bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className="ml-auto w-2/5 h-full bg-blak  shadow-neon z-40 transform transition-transform duration-300 translate-x-0">
                <div></div>
            </div>
        </div>
    );
}
