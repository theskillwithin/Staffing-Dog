import React, { useEffect } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
// import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, from } from 'apollo-link'

import { findToken, findFingerprint, findUserId } from '@sdog/store/user'

import { setTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'

import appTheme from '../app/theme.css'

import UsersList from './users'

const Admin = ({ token, fingerprint, userId }) => {
  useEffect(() => void setTitle('Admin'), [])

  // const authLink = setContext((_, { headers }) => {
  //   return {
  //     headers: {
  //       ...headers,
  //       fingerprint,
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   }
  // })

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        fingerprint,
        authorization: token ? `Bearer ${token}` : '',
      },
    }))

    return forward(operation)
  })

  const httpLink = createHttpLink({
    uri: `http://api.sdog.test/v1/gql?user_id=${userId}`,
  })

  const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  })

  return (
    <div className={clsx(appTheme.pageContent)}>
      <ApolloProvider client={client}>
        <Card type="large">
          <UsersList client={client} />
        </Card>
      </ApolloProvider>
    </div>
  )
}

Admin.propTypes = {
  token: string.isRequired,
  fingerprint: string.isRequired,
  userId: string.isRequired,
}

const mapState = state => ({
  token: findToken(state),
  fingerprint: findFingerprint(state),
  userId: findUserId(state),
})

export default connect(mapState)(Admin)
