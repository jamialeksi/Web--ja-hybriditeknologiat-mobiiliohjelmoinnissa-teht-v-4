import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Todo } from '../types/Todo';

type Props = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoComponent({ item, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.rowPress} onPress={() => onToggle(item.id)}>
        <Text style={[styles.text, item.done ? styles.textDone : null]}>
          {item.text}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  rowPress: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    marginLeft: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});
