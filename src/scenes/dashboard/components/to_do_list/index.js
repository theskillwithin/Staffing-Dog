import React from 'react'
import { array, bool, oneOfType } from 'prop-types'
import Card from '@sdog/components/card'
import Checklist from '@sdog/components/checklist'
import ListIcon from '@sdog/components/svg/List'
import filter from 'lodash/filter'

const list = [
  { name: 'Verify Phone Number', checked: true },
  { name: 'Verify Email Address', checked: true },
  { name: 'Complete Profile', checked: false },
  { name: 'Add Background Check', checked: false },
]

const progressPercent = (collection, search) => {
  const divisor = collection.length
  if (!collection || divisor === 0) return 0
  return filter(collection, search).length / divisor
}

const ToDoList = () => (
  <Card
    title="To Do List"
    icon={ListIcon}
    progress={progressPercent(list, { checked: true })}
  >
    <Checklist list={list} />
  </Card>
)

ToDoList.defaultProps = {
  list: false,
}

ToDoList.propTypes = {
  list: oneOfType([array, bool]),
}

export default ToDoList
