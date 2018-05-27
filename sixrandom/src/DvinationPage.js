
var Dimensions = require('Dimensions');
import React, {Component} from 'react';
import {StyleSheet,View, Text,ScrollView,TouchableOpacity,RefreshControl,FlatList} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';  
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { StackNavigator,NavigationActions } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import IconConfig from './config/IconConfig'
import { Icon,Button } from 'react-native-elements'

import SixrandomHistoryPage from './SixrandomHistoryPage';
import StorageModule from './StorageModule'
import SixrandomNewPage from './SixrandomNewPage';
import EightrandomNewPage from './EightrandomNewPage';
import SixrandomFullInfoPage from './SixrandomFullInfoPage';
import ShareModule from './ShareModule'
import SixrandomModule from './SixrandomModule'
import ValueTypeModule from './ValueTypeModule'
import DvinationConfig from './DvinationConfig/DvinationConfig'

const {width, height} = Dimensions.get('window');  

let mainpage_controllor;

class DvinationPage extends React.Component {
  constructor(props) {

  super(props);
      var wanNianLiInfo = SixrandomModule.lunarsix();
      var day = new Date();
      var selected = this.getDateFormat(day)
      var info = DvinationConfig.GetInfo(wanNianLiInfo)
      //"?date=Mon Jul 10 2017 23:43:54 GMT+0800 (CST)&lunar=123123";
      //var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        wanNianLiInfo:wanNianLiInfo,
        selected:selected,
        info:info
      };
      this.onDayPress = this.onDayPress.bind(this);
      mainpage_controllor = this;
    };

  
  static navigationOptions = ({navigation})=>{
    const { navigate } = navigation;
    
    return{
        headerRight:(<View style={styles.dateContainer}>
                      <Icon name="alarm" size={20} color="#900" onPress={()=>mainpage_controllor.today()}/> 
                      </View>),
      title: '浑天甲子历',
      cardStack:{gesturesEnabled:true}
    }
  };
  renderItem(item) {
    return (
      <View style={styles.lists}>
        <Text style={styles.rowhigth}>{item.item}</Text>
      </View>
    );
  }
  
keyExtractor = (item,index) => item.id
  
  render(){
      const { navigate } = this.props.navigation;
      var wanNianLiInfo = this.state.wanNianLiInfo;
      
      var sel = this.state.selected;
      var selectday = new Date(sel)
      console.log(sel)
      //console.log(wanNianLiInfo.info.oDate)
      //console.log(wanNianLiInfo.info.cnDay)
      //console.log(wanNianLiInfo.six_random_date[0])
      
        return(
    <View style={styles.container}>
      <ScrollView>
      <View style={{height:350}}>
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        calendarWidth={width} 
        onDayPress={this.onDayPress}
        style={styles.calendar}
        current={selectday}
        markedDates={{[this.state.selected]: {selected: true, selectedColor: 'blue'}}}
      />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.list}>
          {wanNianLiInfo.info.Year}年{wanNianLiInfo.info.Month}月{wanNianLiInfo.info.Date}日 星期{wanNianLiInfo.info.cnDay}
        </Text>
        <Text style={styles.list}>
          {wanNianLiInfo.info.gzYear}年{wanNianLiInfo.info.lMonth}月{wanNianLiInfo.info.lDate} ({wanNianLiInfo.info.animal})
        </Text>
      </View>
      <Text style={styles.list}>{wanNianLiInfo.six_random_date[2]}</Text>
      <Text style={styles.list}>{wanNianLiInfo.six_random_date[3]}</Text>
      <Text style={styles.list}>{wanNianLiInfo.six_random_date[4]}</Text>
      <FlatList  
            data={this.state.info}
            keyExtractor={this.keyExtractor}
						renderItem={this.renderItem}
						/>
      <Text style={styles.list}>
      </Text>
      <Text style={styles.list}>
      </Text>

      </ScrollView>
      <TabNavigator >  
        <TabNavigator.Item
              title="六爻"  
              onPress={() => navigate('SixrandomNewPage') } 
              renderIcon={() => IconConfig.Sixrandom}
              renderSelectedIcon={() => IconConfig.SixrandomSel}
               
              titleStyle={styles.menufont}>  
          </TabNavigator.Item>  
          <TabNavigator.Item 
              title="八字"  
              renderIcon={() => IconConfig.Eightrandom}
              renderSelectedIcon={() => IconConfig.EightrandomSel}
              onPress={ 
                  () => navigate('EightrandomNewPage')
                }titleStyle={styles.menufont}>   
          </TabNavigator.Item>  
      </TabNavigator >
      
    </View>  
    )
  }
  getDateFormat(curDate)
  {
    var date = new Date(curDate);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    console.log("currentdate:",currentdate)
    return currentdate;
  }
  today()
  {
    var now = new Date();
    var parameter = "?date="+now.toString()+"&lunar="+"999999"+"&question=";
    this.state.wanNianLiInfo =  SixrandomModule.build(parameter);
    this.state.info = DvinationConfig.GetInfo(this.state.wanNianLiInfo)
    var sday = this.getDateFormat(now);
    this.setState({
      selected:sday
    });
    
  }
  onDayPress(day) {
    console.log(day);
    var now = new Date();
    var time = new Date(day.dateString);
    time.setHours(now.getHours());
    var parameter = "?date="+time.toString()+"&lunar="+"999999"+"&question=";
    this.state.wanNianLiInfo =  SixrandomModule.build(parameter);
    this.state.info = DvinationConfig.GetInfo(this.state.wanNianLiInfo)
    this.setState({
      selected: day.dateString
    });
    
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
};
var styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  calendar: {
    flex:1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    height:2000,
  },
  menufont:{
    fontSize:15,
    color: '#333333', 
    height:15
  },
  rowhigth:{
    lineHeight:25,
  },
  list:{
    height:30,
    paddingLeft:15,
    paddingRight:15,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    flexWrap:'wrap',
    alignItems: 'flex-start',
  },
  lists:{
    paddingLeft:15,
    paddingRight:15,
    justifyContent: 'center', //虽然样式中设置了 justifyContent: 'center'，但无效 
    flexWrap:'wrap',
    alignItems: 'flex-start',
  },
  button:{
    height: 50,
    backgroundColor:'transparent',
   justifyContent:'center',
   borderRadius: 4,
  },
  dateContainer: {
    justifyContent:'space-between',
    flexDirection: 'row',
  },
});
module.exports=DvinationPage;  