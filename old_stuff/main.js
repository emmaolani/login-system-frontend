export default function MainContent(props) {
    const gen = Array.isArray(props.item.genres) ? props.item.genres.toString() : props.item.genres;
    return <div className="book">
               <h3>title: {props.item.title}</h3>
               <p>author: {props.item.author}</p>
               <p>genres: {gen}</p>
            </div>
}
