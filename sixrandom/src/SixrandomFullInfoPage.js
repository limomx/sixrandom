
var Dimensions = require('Dimensions');
var ReactNative = require('react-native');
import React,{Component} from 'react';
import {findNodeHandle,Image,StyleSheet,View, Alert,  Text,ListView,RefreshControl,FlatList,ScrollView,CameraRoll} from 'react-native';
import { captureRef } from "react-native-view-shot";
import TabNavigator from 'react-native-tab-navigator';  
import { StackNavigator } from 'react-navigation';
import SixrandomModule from './SixrandomModule'
import StorageModule from './StorageModule'
import ShareModule from './ShareModule'

var kWidth = Dimensions.get('window').width;
var kHeight = Dimensions.get('window').height;

class SixrandomFullinfoPage extends React.Component {
    constructor(props) {
    super(props);
    //var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      date: "",
      parameter: 'null',
		}};

  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    return{
   // headerRight:(<Button title="分享" onPress={ () => ShareModule.Sharetotimeline() }/>),
    title: '卦象详解',
    }
  };

  componentDidMount() {
		this.timer = setTimeout(
			() => {
				this.refreshlist()
			},
			200
		);
  }
  
  componentWillUnmount() {
		// 如果存在this.timer，则使用clearTimeout清空。
		// 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
		this.timer && clearInterval(this.timer);
	}
  
  refreshlist()
  {
      const { navigate } = this.props.navigation;
      parameter = this.props.navigation.state.params
      if("last"!=parameter)
      {
          var _ret = SixrandomModule.build(parameter);
          var _build = SixrandomModule.get_random_draw()
          console.log(_build)
          this.setState({  
            date: _build,parameter:parameter }); 
      }
      else
      {
        StorageModule.load({
            key:"last",
        }).then(ret => {
            randArray = ret
            var date = new Date(Number(randArray[7]))
            var lunar = ""
            for (index =1;index<7;index++)
            {
              lunar = lunar+(randArray[index]).toString()
            }
            var question = randArray[0]
            var parameter = "?date="+date+"&lunar="+lunar+"&question="+question
            var _ret = SixrandomModule.build(parameter);
            var _build = SixrandomModule.get_random_draw()
            console.log(_build)
            this.setState({  
              date: _build,parameter:parameter }); 
            }).catch(err => {
            if(false==jump)
            {
               this.begin('NewPage')
               jump = true
            }
        })
      }

  }

    renderItem(item) {
      return (
        <View style={styles.list}>
          <Text style={styles.rowhigth}>{item.item}</Text>
        </View>
      );
    }
    
  keyExtractor = (item,index) => item.id
  render(){
    //this.refreshlist()
      const { navigate } = this.props.navigation;
      jump = false;
        return(
    <View style={styles.container} >
    <ScrollView ref='location'> 
            <FlatList  
            data={this.state.date}
            keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
						/>
             </ScrollView> 
              <TabNavigator  tabBarStyle={{ height: 40 }}
       sceneStyle={{ paddingBottom: 30 }} >
                  <TabNavigator.Item
                        title="屏幕截图"  
                        onPress={()=>this.snapshot()}  
                        titleStyle={styles.menufont}>  
                    </TabNavigator.Item>  
                </TabNavigator>  
                
               
              </View>  
    )
    }

  saveImg(img) {
    console.log(img)
    CameraRoll.saveToCameraRoll(img).then(result => {
      alert('保存成功！地址如下：\n' + result);
    }).catch(error => {
        alert('保存失败！\n' + error);
    })
  }

  takeToImage() {
    ReactNative.takeSnapshot(this.refs.location, {format: 'png', quality: 0.8}).then(
        (uri) => this.saveImg(uri)
      ).catch(
        (error) => alert(error)
    );
  }
  snapshot(){
    captureRef(this.refs.location, {
      format: "png",
      quality: 1.0,
      snapshotContentContainer: true
    })
    .then(
      uri => this.saveImg(uri),
      error => console.error("Oops, snapshot failed", error)
    );
  }
}
var styles = StyleSheet.create ({
  container: {
    flex:1
  },
  rowhigth:{
    lineHeight:25,
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
  list:{
    //lineHigeht:25,
    //height:25,
    //borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
     marginRight: 5,
    paddingRight:5,
    //borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    //textAlign:'center', 
    //textDecorationLine:'underline'
    flexWrap:'wrap',
    alignItems: 'flex-start',
    //flexDirection: 'row',
  },
});
module.exports=SixrandomFullinfoPage;  