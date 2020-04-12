import React from 'react'
import TopNavLaptop from './TopNavLaptop'
import TopNavBigScreen from './TopNavBigScreen'
import TopNavMobile from './TopNavMobile'
import { useMediaQuery } from 'react-responsive'

const TopNav = (props) => {
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
    const isLaptopOrTablet = useMediaQuery({
        query: '(min-device-width: 700px)'
    })

    if (isBigScreen) {
        return <TopNavBigScreen updateSearchQuery={props.updateSearchQuery} />;
    }
    else if (isLaptopOrTablet) {
        return <TopNavLaptop updateSearchQuery={props.updateSearchQuery} />
    }
    else { //Mobile
        return <TopNavMobile updateSearchQuery={props.updateSearchQuery} />
    }
}

export default TopNav;