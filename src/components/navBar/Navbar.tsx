import React, {FunctionComponent, useState} from "react";
import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";

const Navbar:FunctionComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    return (
        <BottomNavigation selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
            <BottomNavigationTab title={"Novedades"} icon={(style)=><Icon {...style}  name={'bell-outline'}/>}/>
            <BottomNavigationTab title={"Servicios"} icon={(style)=><Icon {...style} name={'bell-outline'}/>}/>
            <BottomNavigationTab title={"Chat"} icon={(style)=><Icon {...style} name={'bell-outline'}/>}/>
            <BottomNavigationTab title={"Perfil"} icon={(style)=><Icon {...style} name={'bell-outline'}/>}/>
        </BottomNavigation>
    );
}
export default Navbar;
