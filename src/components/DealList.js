import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem';

class App extends React.Component {
	static propTypes ={
		deals: PropTypes.array.isRequired,
		onItemPress: PropTypes.func.isRequired,
	};
	render() {
        return (
			<View style={styles.list}>
				<FlatList
				data={this.props.deals}
				renderItem={({item}) => 
				<DealItem 
				deal={item} 
				onPress={this.props.onItemPress}
				/>
				}
				/>
			</View>
        );
    }
};

const styles = StyleSheet.create({
	list:{
		//flex: 1,
		width: '100%',
		//paddingTop: 50,
		backgroundColor: '#eee'
	}
	
});

export default App;
