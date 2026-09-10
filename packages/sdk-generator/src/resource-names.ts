// Human-readable singular resource names — **overrides only**.
//
// public/resources carries no resource-level description, so the generator
// synthesises one ("The <Name> object is returned …"). By default the name is
// a mechanical humanize of the singular id (`capitalizeFirst(singularize(type)
// .replace(/_/g, ' '))`), which is correct for the vast majority of resources.
// This map holds only the entries where that rule is wrong — acronyms and
// dotted brand names. Anything not listed here falls back to the humanize rule,
// so newly-added resources need no maintenance unless they're similarly
// irregular.
//
// Keyed by machine plural type; values are the human singular (any casing).
export const RESOURCE_NAME_OVERRIDES: Record<string, string> = {
  skus: 'SKU',
  sku_lists: 'SKU list',
  sku_options: 'SKU option',
  sku_list_items: 'SKU list item',
  sku_list_promotion_rules: 'SKU list promotion rule',
  checkout_com_gateways: 'checkout.com gateway',
  checkout_com_payments: 'checkout.com payment',
  talon_one_accounts: 'talon.one account',
}
