# coding: utf-8
from zope import schema
from zope.interface import implements
from zope.component.hooks import getSite
from zope.interface import implementer
from zope.interface import provider
from plone import api
from plone.app.vocabularies.catalog import CatalogSource
from plone.app.z3cform.widget import RelatedItemsFieldWidget
from plone.autoform.directives import widget
from plone.dexterity.content import Item
from plone.supermodel import model
from plone.supermodel.interfaces import IDefaultFactory
from zope.schema.interfaces import IContextAwareDefaultFactory
from plone.formwidget.contenttree import ObjPathSourceBinder
from plone.formwidget.autocomplete import AutocompleteFieldWidget
from plone.app.vocabularies.catalog import CatalogSource
from plone.autoform.directives import read_permission
from plone.autoform.directives import write_permission
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList
from plone.autoform import directives
from Products.CMFCore.utils  import getToolByName

from collective import dexteritytextindexer

from rohberg.bluechurch.content.bluechurchmembraneprofile import IBluechurchmembraneprofile
from rohberg.bluechurch.content.interfaces import IBluechurchMemberContent
from rohberg.bluechurch.fields import URI_bluechurch

import logging
logger = logging.getLogger(__name__)

from rohberg.bluechurch import _


class IBluechurchlocation(model.Schema):
    """ Marker interface for Bluechurchlocation
    """    
    # TODO: make location fields searchable
    # dexteritytextindexer.searchable('bio')

    homepage = URI_bluechurch(
        title=_(u"Website"),
        description = _(u"e.g. www.abcjazzz.com"),
        required = False,
    )
    
    model.load('bluechurchlocation.xml')

from collective.address.behaviors import IAddress
IAddress['street'].required = True


@implementer(IBluechurchlocation)
class Bluechurchlocation(Item):
    """
    """
    implements(IBluechurchMemberContent)

    