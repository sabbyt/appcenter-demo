import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { ThemeProvider, Card, Input, CheckBox, Button } from 'react-native-elements'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      textInput: ''
    }
  }

  addItem () {
    if (this.state.textInput.trim().length !== 0) {
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
              image={require('./resources/gab_logo.png')}
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
