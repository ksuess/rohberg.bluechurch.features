# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from rohberg.bluechurch.testing import ROHBERG_BLUECHURCH_FEATURES_INTEGRATION_TESTING  # noqa

import unittest


class TestSetup(unittest.TestCase):
    """Test that rohberg.bluechurch is properly installed."""

    layer = ROHBERG_BLUECHURCH_FEATURES_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if rohberg.bluechurch is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'rohberg.bluechurch'))

    def test_browserlayer(self):
        """Test that IRohbergBluechurchFeaturesLayer is registered."""
        from rohberg.bluechurch.interfaces import (
            IRohbergBluechurchFeaturesLayer)
        from plone.browserlayer import utils
        self.assertIn(IRohbergBluechurchFeaturesLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = ROHBERG_BLUECHURCH_FEATURES_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['rohberg.bluechurch'])

    def test_product_uninstalled(self):
        """Test if rohberg.bluechurch is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'rohberg.bluechurch'))

    def test_browserlayer_removed(self):
        """Test that IRohbergBluechurchFeaturesLayer is removed."""
        from rohberg.bluechurch.interfaces import \
            IRohbergBluechurchFeaturesLayer
        from plone.browserlayer import utils
        self.assertNotIn(IRohbergBluechurchFeaturesLayer, utils.registered_layers())
