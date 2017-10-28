# coding: utf-8
from zope import schema
from plone.app.vocabularies.catalog import CatalogSource
from plone.app.z3cform.widget import RelatedItemsFieldWidget
from plone.autoform.directives import widget
from plone.dexterity.content import Item
from plone.supermodel import model
from zope.interface import implementer

import logging
logger = logging.getLogger(__name__)

from rohberg.bluechurch.features import _

class IBluechurchinserat(model.Schema):
    """ Marker interface for Bluechurchinserat
    """
    widget(
        'kontaktperson',
        RelatedItemsFieldWidget,
        pattern_options={
            'selectableTypes': ['dexterity.membrane.bluechurchmembraneprofile']
        }
        )
    kontaktperson = schema.Choice(
        title=_(u"Kontaktperson"),
        required=True,
        vocabulary='plone.app.vocabularies.Catalog',
        )
        
    model.load('bluechurchinserat.xml')

@implementer(IBluechurchinserat)
class Bluechurchinserat(Item):
    """
    """
