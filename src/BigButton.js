import './BigButton.css';

export default function (params) {
    const { onClick } = params;
    return (
        <button className="big-button" onClick={onClick}>+</button>
    )
}