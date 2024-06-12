
function List(props) {
    const itemList = props.items
    const listItems = itemList.map(item => 
        <img className="pokemonKarty2" src={item.images.small} alt={item.images.id} onClick={() => props.fun({url:item.images.small,id:item.nationalPokedexNumbers[0]})}/>
    )
    return <div >{listItems}</div>
}
export default List