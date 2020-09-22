import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from 'react-native';
import {Card, Button} from 'react-native-elements';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.setState({loading: true});
    this.fetchData();
  }
  async fetchData() {
    await fetch(
      'http://newsapi.org/v2/everything?domains=wsj.com&apiKey=5b9f39cc5d37482ea06c1e406abd1e76',
    )
      .then((res) => res.json())
      .then((res) => this.setState({articles: res.articles, loading: false}));
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  };
  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            {this.state.articles.map((item, index) => (
              <Card key={index}>
                <Card.Title>{item.source.name}</Card.Title>
                <Card.Divider />
                <Card.Image
                  source={{
                    uri: item.urlToImage,
                  }}></Card.Image>
                <View style={{marginTop: 10}}>
                  <Button
                    onPress={() => Linking.openURL(item.url)}
                    title="VIEW NOW"
                  />
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}
