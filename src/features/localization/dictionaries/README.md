# Dictionary key patterns

##

Page specific keys should use page's path as parent key. For example:

```json
{
  "occurrences/[id]": {
    "category": "Categoria",
    "owned_by": "Por",
    "modal_title_deleteOccurrence": "Excluir ocorrência?",
    "modal_description_deleteOccurrence": "Deseja mesmo excluir a ocorrência? Esta ação é irreversível!"
  }
}
```

## Input fields:

```json
{
  "input_label_{inputName}": "input label...",
  "input_description_{inputName}": "input description...",
  "input_validation_{inputName}_{validationName}": "validation message..."
}
```

## Modals

```json
{
  "modal_title_{modalName}": "modal title...",
  "modal_description_{modalName}": "modal description..."
}
```
