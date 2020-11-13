import React from 'react'

import { connect } from 'react-redux'
import { selectShopCollections } from '../../redux/shop/shop.selectors'
import { createStructuredSelector } from 'reselect'

import CollectionPreview from '../../components/preview-collection/collection-preview.component'

const ShopPage = ({ collections }) => (

  <div className='shop-page'>
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </div>
)

const mapDispatchToProps = createStructuredSelector({
  collections: selectShopCollections
})

export default connect(mapDispatchToProps)(ShopPage)
