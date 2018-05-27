
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,View, Text,Button,TouchableOpacity,RefreshControl,ScrollView,CameraRoll} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import { captureRef } from "react-native-view-shot";
import EightrandomHistoryPage from './SixrandomHistoryPage';
import StorageModule from './StorageModule'
import EightrandomNewPage from './SixrandomNewPage';
import EightrandomFullInfoPage from './SixrandomFullInfoPage';
import ShareModule from './ShareModule'
import SixrandomModule from './SixrandomModule'
import ValueTypeModule from './ValueTypeModule'
import EightrandomModule from './EightrandomModule'

const {width, height} = Dimensions.get('window');  

var jump = false

/*
八字要展现的东西就比较多了
1、公立生日
2、生肖
3、星座
4、农历生日
5、命卦
6、姓名，性别
7、八字盘
8、地势
9、纳音
10、节气
11、大运
12、排大运
13、流年小运
14、四柱神煞
15、五行力量分析
16、日柱分析
17、八字婚姻
18、日柱分析
19、六亲
20、事业
21、健康
22、运势太岁关系
*/



class EightrandomMainPage extends React.Component {
  constructor(props) {

  super(props);

    var sex = ""
    var EightDate = ""
    var birth = ""
    var gzbirth = ""
    var buildeight = new Array();
    var buildeightExt = new Array();
    var precent = new Array();
    var daykey = new Array();
    var relationshipday = ""
    var relationshipearth = ""
    //var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      //dataSource: dataSource,
      sex:sex,
      EightDate:EightDate,
      birth:birth,
      gzbirth:gzbirth,
      buildeight:buildeight,
      buildeightExt:buildeightExt,
      precent:precent,
      daykey:daykey,
      relationshipday:relationshipday,
      relationshipearth:relationshipearth,
		};
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

  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    return{
    //headerLeft:(<Button title="万年历" onPress={  () => navigate('MainPage')  }/>),
    //headerRight:(<Button title="历史" onPress={  () => navigate('HistoryPage')  }/>),
    title: '八字分析',
    }
  };

 
  

  refreshlist()
  {
      const { navigate } = this.props.navigation;
      
      var parameter = this.props.navigation.state.params

      
      if(undefined!=parameter)
      {
        var info = null;
        
        var ret;
        var args = {};
            var match = null;
            var search = decodeURIComponent(parameter.substring(1));
            var reg = /(?:([^&]+)=([^&]+))/g;
            while((match = reg.exec(search))!==null){
                args[match[1]] = match[2];
            }
        info = args
        //console.log(info.EightDate);
        //console.log(info.sex);
        //console.log(info.birth);
        var t = info.birth.split(" ");
        var gz = new Date(t[0]);
        gz.setHours(t[1]);
        console.log(gz);
        var EightDate = SixrandomModule.lunar_f(gz)
        var gzDate=EightDate.gzYear +" "+ EightDate.gzMonth +" "+ EightDate.gzDate;
        
        this.setState({  
            sex:info.sex,EightDate:info.EightDate,birth:info.birth,gzbirth:gzDate }); 
            this.buildeight();
      }
      else
      {
        StorageModule.load({
            key:"lastname",
        }).then(ret => {
              this.setState({  
                sex:ret.sex,EightDate:ret.EightDate }); 
            }).catch(err => {
            if(false==jump)
            {
               this.begin('EightrandomNewPage')
               jump = true
            }
        })
      }
  }

   _renderRow(rowData) {
    //alert(rowData.name)
    return (
      
      <View style={styles.list}>
        <Text  style={styles.rowhigth}>{rowData}</Text>
      </View>
    );
  }
  buildeight()
  {
    var buildeight = new Array()
    buildeight[0] = EightrandomModule.parentday(this.state.EightDate[0],this.state.EightDate[4])
    buildeight[2] = EightrandomModule.parentday(this.state.EightDate[2],this.state.EightDate[4])
    buildeight[4] = "元"//this.parentday(this.state.EightDate[4],this.state.EightDate[4])
    buildeight[6] = EightrandomModule.parentday(this.state.EightDate[6],this.state.EightDate[4])
    buildeight[1] = EightrandomModule.parentearth(this.state.EightDate[1],this.state.EightDate[4])
    buildeight[3] = EightrandomModule.parentearth(this.state.EightDate[3],this.state.EightDate[4])
    buildeight[5] = EightrandomModule.parentearth(this.state.EightDate[5],this.state.EightDate[4])
    buildeight[7] = EightrandomModule.parentearth(this.state.EightDate[7],this.state.EightDate[4])
    var buildeightExt = new Array()
    buildeightExt[0] = EightrandomModule.gethide(this.state.EightDate[1]);
    buildeightExt[2] = EightrandomModule.gethide(this.state.EightDate[3]);
    buildeightExt[4] = EightrandomModule.gethide(this.state.EightDate[5]);
    buildeightExt[6] = EightrandomModule.gethide(this.state.EightDate[7]);
    buildeightExt[1] = EightrandomModule.gethideshishen(buildeightExt[0],this.state.EightDate[4]);
    buildeightExt[3] = EightrandomModule.gethideshishen(buildeightExt[2],this.state.EightDate[4]);
    buildeightExt[5] = EightrandomModule.gethideshishen(buildeightExt[4],this.state.EightDate[4]);
    buildeightExt[7] = EightrandomModule.gethideshishen(buildeightExt[6],this.state.EightDate[4]);
    var precent = new Array();
    var daykey = new Array();
    var o = EightrandomModule.getfive(this.state.EightDate)
    precent = o.q
    daykey = o.p
    var r = EightrandomModule.getrelationship(this.state.EightDate)
    var relationshipday = r.dr
    var relationshipearth = r.er
    console.log(r)
    this.setState({  
      buildeight:buildeight, buildeightExt:buildeightExt,
      daykey:daykey,precent:precent,
      relationshipday:relationshipday,
      relationshipearth:relationshipearth}); 
  }
  
  render(){
      const { navigate } = this.props.navigation;
      
      jump = false;
      
        return(
        <View style={styles.container} >
          <ScrollView ref="location">


           
            <View style={styles.EightstyleSectionline}> 
              <Text style={styles.EightstyleLinewithfont}>公历: {this.state.birth}</Text>
            </View>
            <View style={styles.EightstyleSectionline}> 
              <Text style={styles.EightstyleLinewithfont}>农历: {this.state.gzbirth}</Text>
            </View>
            <View style={styles.EightstyleSectionline}> 
              <Text style={styles.Eightstylewithfont}>{this.state.sex}</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text style={styles.Eightstylewithfont}>令</Text>
              <Text style={styles.Eightstylewithfont}>年</Text>
              <Text style={styles.Eightstylewithfont}>月</Text>
              <Text style={styles.Eightstylewithfont}>日</Text>
              <Text style={styles.Eightstylewithfont}>时</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text style={styles.Eightstylewithfont}>亲</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[0]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[2]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[4]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[6]}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text style={styles.Eightstylewithfont}>干</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[0]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[2]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[4]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[6]}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text style={styles.Eightstylewithfont}>支</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[1]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[3]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[5]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.EightDate[7]}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text style={styles.Eightstylewithfont}>亲</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[1]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[3]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[5]}</Text>
              <Text style={styles.Eightstylewithfont}>{this.state.buildeight[7]}</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>藏</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[0]}</Text>

              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[2]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[4]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[6]}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>亲</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[1]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[3]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[5]}</Text>
              <Text numberoflines={4} style={[styles.Eightstylewithfontmultline,{width:20}]}>{this.state.buildeightExt[7]}</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>木</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>火</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>土</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>金</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>水</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>{this.state.precent[0]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.precent[1]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>{this.state.precent[2]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>{this.state.precent[3]}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>{this.state.precent[4]}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'green'}]}>{this.state.precent[5]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.precent[6]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'brown'}]}>{this.state.precent[7]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'gold'}]}>{this.state.precent[8]}%</Text>
              <Text numberoflines={1} style={[styles.Eightstylewithfont,{color:'blue'}]}>{this.state.precent[9]}%</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>甲:{this.state.daykey['甲']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>丙:{this.state.daykey['丙']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>戊:{this.state.daykey['戊']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>庚:{this.state.daykey['庚']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>壬:{this.state.daykey['壬']}</Text>
              </View>
              <View style={styles.EightstyleCoreline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'green'}]}>乙:{this.state.daykey['乙']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>丁:{this.state.daykey['丁']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'brown'}]}>己:{this.state.daykey['己']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'gold'}]}>辛:{this.state.daykey['辛']}</Text>
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'blue'}]}>癸:{this.state.daykey['癸']}</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.relationshipday}</Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}>{this.state.relationshipearth}</Text>
              </View>

              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
              <View style={styles.EightstyleSectionline}> 
              <Text numberoflines={2} style={[styles.Eightstylewithfont,{color:'red'}]}></Text>
              </View>
      
              </ScrollView>  
              
                          <TabNavigator tabBarStyle={{ height: 40 }}
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
    begin(pagename)
    {
      const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
              NavigationActions.navigate({ routeName: pagename}),
          ]
        })
        this.props.navigation.dispatch(resetAction)
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

   
  };


    




var styles = StyleSheet.create ({
  container: {
    flex:1,
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:25
  },
 rowhigth:{
    lineHeight:25,
  },
  list:{
    height:30,
    marginLeft: 1,
    paddingLeft:1,
    borderRadius: 4,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    flexWrap:'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textbutton:{
    textAlign:'center', 
  },
   button:{
    height: 50,
    backgroundColor:'transparent',
   justifyContent:'center',
   borderRadius: 4,
    },
  tabBarStyle:{
    flex: 1,
    height:40,
    flex:1
  },
  EightstyleLinewithfont:{
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize:18
  },
  Eightstylewithfont:{
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize:18
  },
  Eightstylewithfontmultline:{
    width:40,
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    fontSize:18
  },
  EightstyleSectionline: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
    marginTop: 30,
  },
  EightstyleCoreline: {
    justifyContent: 'space-around', //虽然样式中设置了 justifyContent: 'center'，但无效  
    flexDirection: 'row',
    marginLeft: 30, 
    marginRight: 30, 
  },
});
module.exports=EightrandomMainPage;  