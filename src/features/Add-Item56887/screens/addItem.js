import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Input, withStyles, Avatar, Button} from 'react-native-ui-kitten';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

class _AddItem extends React.Component {
  static navigationOptions = {
    title: 'Add Item'.toUpperCase(),
  };

  state = {
    name: '',
    location: '',
    email: '',
    startTime: '',
    duration: '',
    date: '', //new Date(),
    imgSource: '',
  };

  onNameInputChanged = text => {
    this.setState({name: text});
  };

  onLocationInputChanged = text => {
    this.setState({location: text});
  };

  onDateInputChanged = text => {
    this.setState({date: text});
  };

  onStartTimeInputChanged = text => {
    this.setState({startTime: text});
  };

  onDurationInputChanged = text => {
    this.setState({duration: text});
  };

  showImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imgSource: source,
        });
      }
    });
  };

  render = () => {
    const {themedStyle} = this.props;

    return (
      <KeyboardAwareScrollView contentContainerStyle={themedStyle.root}>
        <View style={themedStyle.section}>
          <View style={[themedStyle.row, themedStyle.heading]}>
            <Text category="h6" style={themedStyle.text}>
              EVENT INFO
            </Text>
          </View>
          <View style={themedStyle.row}>
            <Input
              label="Name"
              value={this.state.name}
              onChangeText={this.onNameInputChanged}
              style={this.props.themedStyle.Input}
              status="info"
              textStyle={this.props.themedStyle.text}
            />
          </View>
          <View style={themedStyle.row}>
            <Input
              label="Location"
              value={this.state.location}
              onChangeText={this.onLocationInputChanged}
              style={this.props.themedStyle.Input}
              status="info"
              textStyle={this.props.themedStyle.text}
            />
          </View>
          <View style={themedStyle.row}>
            <Input
              label="On date"
              value={this.state.date}
              onChangeText={this.onDateInputChanged}
              style={this.props.themedStyle.Input}
              status="info"
              textStyle={this.props.themedStyle.text}
            />
            {/* <Datepicker date={this.state.date} onSelect={this.onSelect} /> */}
          </View>
          <View style={themedStyle.row}>
            <Input
              label="Start on"
              value={this.state.startTime}
              onChangeText={this.onStartTimeInputChanged}
              style={this.props.themedStyle.Input}
              status="info"
              textStyle={this.props.themedStyle.text}
            />
          </View>
          <View style={themedStyle.row}>
            <Input
              label="Duration"
              value={this.state.duration}
              onChangeText={this.onDurationInputChanged}
              style={this.props.themedStyle.Input}
              status="info"
              textStyle={this.props.themedStyle.text}
            />
          </View>
        </View>
        <View style={themedStyle.section}>
          <View style={[themedStyle.row, themedStyle.heading]}>
            <Text category="h6" style={themedStyle.text}>
              SELECT IMAGE
            </Text>
          </View>

          <View style={themedStyle.row}>
            <TouchableOpacity
              style={this.props.themedStyle.imageBtn}
              onPress={this.showImagePicker}>
              {this.state.imgSource ? (
                <Image
                  source={this.state.imgSource}
                  style={this.props.themedStyle.image}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  style={this.props.themedStyle.image}
                  source={require('../assets/images/upload.png')}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button style={themedStyle.button} status="danger" size="large">
          SAVE
        </Button>
      </KeyboardAwareScrollView>
    );
  };
}

export default AddItem = withStyles(_AddItem, theme => ({
  root: {
    backgroundColor: theme['color-basic-100'],
  },
  header: {
    backgroundColor: theme['color-basic-100'],
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginVertical: 15,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme['color-basic-400'],
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  text: {
    color: theme['color-basic-1000'],
  },
  Input: {
    width: '100%',
    backgroundColor: theme['color-basic-100'],
  },
  imageBtn: {
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  image:{
    height: 200,
    width: '100%'
  }
}));
