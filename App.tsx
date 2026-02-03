import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, }
from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: string;
  text: string;
  done: boolean; };

const STORAGE_KEY = 'todos';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setTodos(JSON.parse(json));
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    };
    save();
  }, [todos]);

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />

        <Pressable onPress={addTodo}>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => toggleTodo(item.id)}>
            <Text style={[styles.todoText, item.done ? styles.done : null]}>
              {item.text}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 6,
    marginRight: 12,
  },
  save: {
    fontSize: 18,
    color: '#007AFF',
  },
  todoText: {
    fontSize: 18,
    paddingVertical: 8,
  },
  done: {
    textDecorationLine: 'line-through',
  },
});
