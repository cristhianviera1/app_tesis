
import React, {FunctionComponent} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Navbar from "../navBar/Navbar";

const Content: FunctionComponent = ({children}) => {
    return (
        <SafeAreaView style={styles.container}>
            {/*<Header />*/}
            <View style={{flex: 1}}>{children}</View>
            <Navbar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
    },
});

export default Content;
