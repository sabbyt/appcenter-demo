import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { ThemeProvider, Card, Input, CheckBox, Button } from 'react-native-elements'
import codePush from 'react-native-code-push'

// import Crashes from 'appcenter-crashes'
// import Analytics from 'appcenter-analytics'

let codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      textInput: ''
    }
  }

  // async componentDidMount () {
  //   const didCrash = await Crashes.hasCrashedInLastSession()

  //   if (didCrash) {
  //     alert('Achievement unlocked: App crashed during a presentation')
  //   }
  // }

  codePushStatusDidChange (status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        break
    }
  }

  codePushDownloadDidProgress (progress) {
    console.log(progress.receivedBytes + ' of ' + progress.totalBytes + ' received.')
  }

  addItem () {
    if (this.state.textInput.trim().length !== 0) {
      // Analytics.trackEvent('Add new item', { Task: this.state.textInput })

      // Creating new task item
      let newTask = {title: this.state.textInput, completed: false}
      // Updating task list
      let newTaskList = this.state.list
      newTaskList.push(newTask)
      // Updating state with new task list
      this.setState({
        list: newTaskList,
        textInput: ''
      })
    }
  }

  updateItem (index, itemStatus) {
    // Updating completed status of task item
    let updatedTaskItem = {
      ...this.state.list[index],
      completed: !itemStatus
    }
    // Updating task list with updated task item
    let newTaskList = this.state.list
    newTaskList.splice(index, 1, updatedTaskItem)
    // Updating state with updated task list
    this.setState({
      list: newTaskList
    })
  }

  render () {
    return (
      <ThemeProvider>
        <ScrollView>
          <View accessibilityLabel='testview'>
            <Card
              title='Welcome to GAB 2019!'
              // image={require('./resources/gab_logo.png')}
              image={require('./resources/ms_logo.jpg')}
              imageProps={{resizeMode: 'contain'}} />
            <Card>
              <Input
                label={'Add a to-do item'}
                value={this.state.textInput}
                placeholder={'+'}
                onChangeText={(textInput) => this.setState({textInput})}
                onSubmitEditing={() => this.addItem()}
                returnKeyType={'done'}
              />
              <Button
                title='Crash Button'
                type='outline'
                raised
                containerStyle={{marginTop: 20}}
                onPress={() => {
                  throw new Error('This is a test javascript crash!')
                }}
              />
              <Button
                title='Add'
                type='outline'
                raised
                containerStyle={{marginTop: 20}}
                onPress={() => this.addItem()}
              />
            </Card>
            {
              this.state.list.length !== 0
                ? <Card>
                  {
                    this.state.list.map((item, index) => <CheckBox
                      key={index}
                      title={item.title}
                      checked={item.completed}
                      onPress={() => this.updateItem(index, item.completed)} />)
                  }
                </Card>
                : null
            }
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}

export default codePush(codePushOptions)(App)
