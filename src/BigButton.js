import './BigButton.css';

export default function (params) {
    const { onClick } = params;
    return (
        <button class="big-button" onClick={onClick}>+</button>
    )
}