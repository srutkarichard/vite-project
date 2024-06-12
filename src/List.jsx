
function List(props) {
    const itemList = props.items
    const listItems = itemList.map(item => 
        <img className="pokemonKarty2" src={item.images.small} alt={item.images.id} onClick={() => props.fun({url:item.images.small,id: props.currentPokemon})}/>
    )
    return <div >{listItems}</div>
}
export default List