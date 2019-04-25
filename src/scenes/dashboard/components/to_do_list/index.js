import React from 'react'
import { array, bool, oneOfType, shape } from 'prop-types'
import { connect } from 'react-redux'
import get from '@sdog/utils/get'
import Card from '@sdog/components/card'
import { findUserProfile } from '@sdog/store/user'
import Checklist from '@sdog/components/checklist'
import ListIcon from '@sdog/components/svg/List'
import filter from 'lodash/filter'

const progressPercent = (collection, search) => {
  const divisor = collection.length
  if (!collection || divisor === 0) return 0
  return filter(collection, search).length / divisor
}

const ToDoList = ({ userProfile, list }) => {
  const listOfTodos = list || [
    {
      name: 'Verify Phone Number',
      checked: get(userProfile, 'user.verified_phone', false),
    },
    {
      name: 'Verify Email Address',
      checked: get(userProfile, 'user.verified_email', false),
    },
  ]

  return (
    <Card
      title="To Do List"
      icon={ListIcon}
      progress={progressPercent(list, { checked: true })}
    >
      <Checklist list={listOfTodos} />
    </Card>
  )
}

ToDoList.defaultProps = {
  list: false,
}

ToDoList.propTypes = {
  list: oneOfType([array, bool]),
  userProfile: shape({}).isRequired,
}

export const mapStateToProps = state => ({ userProfile: findUserProfile(state) })

export default connect(mapStateToProps)(ToDoList)
