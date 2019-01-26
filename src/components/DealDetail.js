import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {priceDisplay} from './util';
import ajax from './ajax';


//TODO get flow typescript
class App extends React.Component {
	static propTypes ={
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        deal: this.props.initialDealData,
    };

	async componentDidMount(){
		const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal: fullDeal,
        });
	}

	render() {
		const {deal} = this.state;
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}> Back</Text>
                </TouchableOpacity>
			<Image source={{uri: deal.media[0]}} style={styles.image} />
                <View style={styles.detail}>
                    <View>
                        <Text style={styles.title}>{deal.title}</Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.info}>
                            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                            <Text style={styles.cause}>{deal.cause.name}</Text>
                        </View>
                        {deal.user && (
                            <View style={styles.footer}>
                                <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                                <Text>{deal.user.name}</Text>
                            </View>
                         )}
                        <View>
                        <View style={styles.description}>
                            <Text style={styles.info}>{deal.description}</Text>
                        </View>
                    </View>
                </View>
			</View>	
		</View>
        );
    }
}

const styles = StyleSheet.create({
	//deal:{
	//	marginHorizontal: 12,
	//},
    detail: {
       // borderColor: '#ccc',
       // borderWidth: 1,
    },

	image:{
		width: '100%',
		height: 150,
		backgroundColor: '#ccc',
    },

    backLink: {
        marginBottom: 5,
        color: '#22f',
        marginLeft: 10
    },
	
	info:{
		padding: 10,
		backgroundColor: '#fff',
	//	borderColor: '#bbb',
		//borderWidth: 1,
		//borderTopWidth: 0,
	},
	
	title:{
		fontSize: 16,
		fontWeight: 'bold',
        marginBottom: 5,
        padding: 10,
        backgroundColor: 'rgba(237, 149, 45, 0.4)'
	},
	
	footer:{
        //flexDirection: 'row',
        //justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
	},
	
	cause:{
		//flex: 2,
	},
	
	price:{
		//flex: 1,
		textAlign: 'right',
    },

    avatar: {
        width: 60,
        height: 60,
    }
	
});

export default App;
