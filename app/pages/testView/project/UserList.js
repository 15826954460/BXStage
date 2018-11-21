import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('UserStore')
@observer
export default class UserList extends React.Component {
  _renderItem = ({ item }) => {
    return (
      <Text
        style={{
          width: '100%',
          backgroundColor: 'skyblue',
          fontWeight: 'bold',
          padding: 5,
        }}>
        {item.name}
      </Text>
    );
  };

  render() {
    const { UserStore } = this.props;
    return (
      <FlatList
        style={{ flex: 1, backgroundColor: 'gray' }}
        data={UserStore.userList}
        renderItem={this._renderItem}
        keyExtractor={(item, i) => i}
        ItemSeparatorComponent={() => <View style={{margin: 1}}/>}
      />
    );
  }
}
