# -*- coding: utf-8 -*-
from zope import schema
from zope.interface import implementer
from plone import api
from plone.app.vocabularies.catalog import CatalogSource
from plone.app.z3cform.widget import RelatedItemsFieldWidget
from plone.autoform.directives import widget
from plone.dexterity.content import Item
from plone.supermodel import model
from zope.interface import implementer

import logging
logger = logging.getLogger(__name__)

from rohberg.bluechurch import _


class IBluechurchpage(model.Schema):
    """ Marker interface for Bluechurchpage
    """

    
    model.load('bluechurchpage.xml')


@implementer(IBluechurchpage)
class Bluechurchpage(Item):
    """
    """