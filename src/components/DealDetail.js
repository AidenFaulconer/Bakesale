import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    PanResponder,
    Animated,
    TouchableOpacity,
    Dimensions,
    Button,
	ScrollView,
    Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import {priceDisplay} from './util';
import ajax from './ajax';

class DealDetail extends React.Component {

    imageXPos = new Animated.Value(0);

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    imagePanResponser = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs.dx);
                //-1 for left, +1 for right
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            } //handle exception where swipe is less than 40% of screen width by resetting value 
        },
    });

    handleSwipe = (indexDirection) => {
        //if image array out of bounds reset swipe and dont update value to next image
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            //Next image animation
            this.imageXPos.setValue(indexDirection  * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        });
    }

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0,
    };

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal: fullDeal,
        });
    }

    openDealUrl = () => {
        Linking.openURL(this.state.deal.url);
    };

    render() {

        const { deal } = this.state;

        return (
            <ScrollView style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}> Back</Text>
                </TouchableOpacity>
                <Animated.Image
                    {...this.imagePanResponser.panHandlers}
                    source={{ uri: deal.media[this.state.imageIndex] }}
                    style={[{ left: this.imageXPos }, styles.image]}
                />
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
                            <Button title='Buy this deal' onPress={this.openDealUrl}/>
                    </View>
                </View>
			</View>	
		</ScrollView>
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

export default DealDetail;
