import React, { useEffect } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { findToken, findFingerprint } from '@sdog/store/user'

import { setTitle } from '@sdog/utils/document'
import Card from '@sdog/components/card'

import appTheme from '../app/theme.css'

import UsersList from './users'

const Admin = ({ token, fingerprint }) => {
  useEffect(() => void setTitle('Admin'), [])

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        fingerprint,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const httpLink = createHttpLink({
    uri: 'http://api.sdog.test/v1/gql',
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
}

const mapState = state => ({
  token: findToken(state),
  fingerprint: findFingerprint(state),
})

export default connect(mapState)(Admin)
