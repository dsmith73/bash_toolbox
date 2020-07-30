import React from 'react'
import { connect } from 'react-redux'
import { SPRITE_SIZE } from '../../config/constants'
import './styles.css'

function getTileSprite(type) {
    switch(type) {
        // Walk Tiles  0 - 3  
        case 0:
            return 'grass'
        case 1:
            return 'tree'
        // Loot Tile - 4  
        case 4:
            return 'chest'
        // Impass Tiles 5 - 19  
        case 5:
            return 'rock'
        case 6:
            return 'tree'
        case 7:
            return 'player'
        // MOB Tiles 20 - 99  
        case 20:
            return 'goblin'
        case 30:
            return 'wolf'
        case 40:
            return 'spider'
        case 50:
            return 'redDragon'

        default:
            return 'grass'
    }
}

function MapTile(props) {
    return <div 
        className={`tile ${getTileSprite(props.tile)}`}
        style={{
            height: SPRITE_SIZE,
            width: SPRITE_SIZE,
        }}
    />
        
}

function MapRow(props) {
    return <div className="row">
        {
            props.tiles.map( tile => <MapTile tile={tile} /> )
        }
    </div>
}


function Map(props) {
    return (
        <div
            style={{
                position: 'relative',
                margin: '0',
                top: '0',
                left: '0',
                width: '800px',
                height: '480px',
                // paddingTop: '4px',  // needed to add 4px pad to top after changing margin in css  
                border: '4px solid white',
            }}
        >
            {
                props.tiles.map(row => <MapRow tiles={row} />)
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
    }
}

export default connect(mapStateToProps)(Map)


