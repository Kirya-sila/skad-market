import React from 'react'
import { ModalRenderer } from '@app/config/modal/modal.renderer'
import css from './Uikit.module.scss'
import {
  AboutStory,
  BottomSheetStory,
  BrandsStory,
  BreadcrumbsStory,
  BurgerMenuStory,
  CartButtonStory,
  CatalogBrandCarStory,
  CategoryCardStory,
  CheckboxListItemSmallStory,
  CheckboxListItemStory,
  ChipStory,
  CircleProgressStory,
  ColorFilterStory,
  ComparisonProductButtonStory,
  DividerStory,
  FavoriteProductButtonStory,
  FilterItemStory,
  FilterTabMobileStory,
  FooterStory,
  IconButtonStory,
  ListStory,
  MenuButtonsStory,
  ModalStory,
  PopularCategoriesStory,
  PriceButtonsStory,
  ProductCardStory,
  ProductSelectionByCarStory,
  PromoButtonStory,
  PromoStory,
  RadioButtonStory,
  RegularButtonsStory,
  RimParamCompatibilityTabsStory,
  SearchInputsStory,
  SelectionInputStory,
  SkadMarketLogosStory,
  SnackbarStory,
  SocialMediaButtonStory,
  SwiperStory,
  SwitchStory,
  TabBarButtonStory,
  TabStory,
  TextInputStory,
  TooltipStory,
} from '@/pages/uikit-page/ui/Stories'

export const UIKitPage = () => {
  return (
    <div className={css.uikit}>
      <RimParamCompatibilityTabsStory />
      <ProductCardStory />
      <FilterItemStory />
      <SwitchStory />
      <BreadcrumbsStory />
      <FilterTabMobileStory />
      <ChipStory />
      <BurgerMenuStory />
      <CheckboxListItemSmallStory />
      <TextInputStory />
      <SnackbarStory />
      <CircleProgressStory />
      <FooterStory />
      <SocialMediaButtonStory />
      <BottomSheetStory />
      <TooltipStory />
      <DividerStory />
      <PopularCategoriesStory />
      <AboutStory />
      <BrandsStory />
      <PromoStory />
      <TabBarButtonStory />
      <ProductSelectionByCarStory />
      <CartButtonStory />
      <ColorFilterStory />
      <FavoriteProductButtonStory />
      <ComparisonProductButtonStory />
      <PromoButtonStory />
      <IconButtonStory />
      <ListStory />
      <TabStory />
      <CatalogBrandCarStory />
      <ModalStory />
      <CategoryCardStory />
      <RadioButtonStory />
      <CheckboxListItemStory />
      <SelectionInputStory />
      <SwiperStory />
      <SearchInputsStory />
      <RegularButtonsStory />
      <PriceButtonsStory />
      <SkadMarketLogosStory />
      <MenuButtonsStory />

      <ModalRenderer />
    </div>
  )
}
