class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class MultiSelectList extends React.PureComponent {
  state = {selected: new Map()};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    });
  };

  _onPress = (item) => {
    this._onPressItem(item.id);
  };

  _renderItem = ({item}) => {
    const textColor = this.state.selected ? "red" : "black";
    return  <TouchableOpacity onPress={() => this._onPress(item)}>
      <View>
        <Text style={{ color: textColor }}>
          {this.props.title}
        </Text>
      </View>
    </TouchableOpacity>
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}