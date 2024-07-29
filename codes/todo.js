import * as React from 'react';
import { Provider as PaperProvider, Appbar, Button, TextInput, Text, List, DarkTheme } from 'react-native-paper';
import { Alert, View, StyleSheet, ImageBackground } from 'react-native';

const App = () => {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Math.random().toString(), title: task }]);
      setTask('');
    }
  };

  const confirmRemoveTask = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => removeTask(id) }
      ],
      { cancelable: false }
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ImageBackground 
      source={{ uri: "https://a-static.besthdwallpaper.com/sunset-abstract-wallpaper-1600x1200-212_23.jpg" }}
      style={styles.background}
    >
      <PaperProvider theme={DarkTheme}>
        <Appbar.Header style={{ backgroundColor: '#003366' }}>
          <Appbar.Content title="To-Do Saqr" titleStyle={{ color: '#FFFFFF' }} />
        </Appbar.Header>
        <View style={styles.container}>
          <TextInput
            label="Add a new task"
            value={task}
            onChangeText={text => setTask(text)}
            style={styles.input}
          />
          <Button mode="contained" onPress={addTask} style={styles.button}>
            Add Task
          </Button>
          <View style={styles.taskListContainer}>
            <List.Section title="Tasks" titleStyle={{ color: '#000' }}>
              {tasks.map((task) => (
                <List.Item
                  key={task.id}
                  title={task.title}
                  onPress={() => confirmRemoveTask(task.id)}
                  left={props => <List.Icon {...props} icon="check" />}
                  titleStyle={{ color: '#000' }}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
          </View>
        </View>
      </PaperProvider>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    width: '100%',
    marginBottom: 10
  },
  button: {
    width: '100%',
    marginBottom: 10
  },
  taskListContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 5
  }
});

export default App;
