/**
 * ERP Composer
 * Composition rules specific to ERP/SaaS applications
 */

export class ERPComposer {
  constructor() {
    this.rules = {
      // Every ERP screen must have
      requiredScreenElements: [
        'shell.app',
        'breadcrumbs',
        'pageActions'
      ],

      // ListView requirements
      listViewRequirements: {
        toolbar: true, // search + filters + columns
        pagination: true,
        states: ['empty', 'loading', 'error', 'no-permission']
      },

      // Platform adaptations
      platformAdaptations: {
        mobile: {
          listView: 'organism.entityCardList',
          filters: 'organism.filterSheet',
          form: 'organism.drawerForm'
        },
        desktop: {
          listView: 'organism.dataTablePro',
          filters: 'organism.filterBar',
          form: 'organism.modalForm',
          shortcuts: true,
          contextMenu: true
        },
        web: {
          listView: 'organism.dataTablePro',
          filters: 'organism.filterBar',
          form: 'organism.pageForm'
        }
      },

      // Entity view mappings
      entityViewMappings: {
        list: {
          web: 'organism.dataTablePro',
          mobile: 'organism.entityCardList',
          desktop: 'organism.dataTablePro'
        },
        create: {
          web: 'organism.formBuilder',
          mobile: 'organism.drawerForm',
          desktop: 'organism.modalForm'
        },
        edit: {
          web: 'organism.formBuilder',
          mobile: 'organism.drawerForm',
          desktop: 'organism.modalForm'
        },
        detail: {
          web: 'organism.detailView',
          mobile: 'organism.detailView',
          desktop: 'organism.detailView'
        }
      }
    };
  }

  /**
   * Compose entity views based on entity spec
   */
  composeEntityViews(entitySpec, platform = 'web') {
    const views = {
      list: this.composeListView(entitySpec, platform),
      create: this.composeCreateView(entitySpec, platform),
      edit: this.composeEditView(entitySpec, platform),
      detail: this.composeDetailView(entitySpec, platform)
    };

    return views;
  }

  /**
   * Compose list view
   */
  composeListView(entitySpec, platform) {
    const componentId = this.rules.entityViewMappings.list[platform];
    const requirements = this.rules.listViewRequirements;

    return {
      component: componentId,
      props: {
        entity: entitySpec.id,
        columns: entitySpec.views?.list?.columns || [],
        serverSide: true,
        selectable: true,
        pagination: requirements.pagination,
        toolbar: requirements.toolbar
      },
      children: [
        {
          component: 'organism.tableToolbar',
          props: {
            showSearch: true,
            showFilters: true,
            showColumns: true,
            showExport: entitySpec.permissions?.export?.length > 0,
            showCreate: entitySpec.permissions?.create?.length > 0
          }
        },
        {
          component: 'organism.filterBar',
          props: {
            fields: this.extractFilterFields(entitySpec),
            variant: platform === 'mobile' ? 'drawer' : 'inline'
          },
          condition: requirements.toolbar
        },
        {
          component: componentId,
          props: {
            columns: entitySpec.views?.list?.columns || [],
            data: [], // Will be filled at runtime
            emptyState: {
              component: 'organism.emptyTableState',
              props: {
                title: `No ${entitySpec.pluralName} found`,
                action: {
                  label: `Create ${entitySpec.name}`,
                  permission: `${entitySpec.id}.create`
                }
              }
            },
            loadingState: {
              component: 'atom.skeleton',
              props: { rows: 5 }
            },
            errorState: {
              component: 'organism.errorState',
              props: {}
            },
            noPermissionState: {
              component: 'organism.permissionBanner',
              props: {
                permission: `${entitySpec.id}.view`
              }
            }
          }
        },
        {
          component: 'molecule.pagination',
          props: {
            serverSide: true
          },
          condition: requirements.pagination
        }
      ]
    };
  }

  /**
   * Compose create view
   */
  composeCreateView(entitySpec, platform) {
    const componentId = this.rules.entityViewMappings.create[platform];

    return {
      component: componentId,
      props: {
        entity: entitySpec.id,
        mode: 'create',
        schema: this.entityToFormSchema(entitySpec),
        variant: platform === 'mobile' ? 'drawer' : 'page'
      },
      children: [
        {
          component: 'layout.breadcrumbs',
          props: {
            items: [
              { label: 'Home', href: '/' },
              { label: entitySpec.pluralName, href: `/${entitySpec.id}` },
              { label: `New ${entitySpec.name}` }
            ]
          }
        },
        {
          component: componentId,
          props: {
            schema: this.entityToFormSchema(entitySpec),
            submitLabel: `Create ${entitySpec.name}`,
            cancelLabel: 'Cancel',
            onSubmit: `create${entitySpec.name}`,
            permission: `${entitySpec.id}.create`
          }
        }
      ]
    };
  }

  /**
   * Compose edit view
   */
  composeEditView(entitySpec, platform) {
    const componentId = this.rules.entityViewMappings.edit[platform];

    return {
      component: componentId,
      props: {
        entity: entitySpec.id,
        mode: 'edit',
        schema: this.entityToFormSchema(entitySpec),
        variant: platform === 'mobile' ? 'drawer' : 'page'
      },
      children: [
        {
          component: 'layout.breadcrumbs',
          props: {
            items: [
              { label: 'Home', href: '/' },
              { label: entitySpec.pluralName, href: `/${entitySpec.id}` },
              { label: 'Edit' }
            ]
          }
        },
        {
          component: componentId,
          props: {
            schema: this.entityToFormSchema(entitySpec),
            submitLabel: 'Save Changes',
            cancelLabel: 'Cancel',
            onSubmit: `update${entitySpec.name}`,
            permission: `${entitySpec.id}.edit`
          }
        }
      ]
    };
  }

  /**
   * Compose detail view
   */
  composeDetailView(entitySpec, platform) {
    return {
      component: 'organism.detailView',
      props: {
        entity: entitySpec.id,
        variant: 'tabs',
        showActivity: true
      },
      children: [
        {
          component: 'layout.breadcrumbs',
          props: {
            items: [
              { label: 'Home', href: '/' },
              { label: entitySpec.pluralName, href: `/${entitySpec.id}` },
              { label: 'Details' }
            ]
          }
        },
        {
          component: 'organism.detailView',
          props: {
            overview: this.getOverviewCards(entitySpec),
            tabs: this.getDetailTabs(entitySpec),
            actions: this.getDetailActions(entitySpec)
          }
        }
      ]
    };
  }

  /**
   * Extract filter fields from entity spec
   */
  extractFilterFields(entitySpec) {
    return (entitySpec.fields || [])
      .filter(field => field.filterable !== false)
      .map(field => ({
        id: field.name,
        label: field.label || field.name,
        type: this.mapFieldTypeToFilterType(field.type)
      }));
  }

  /**
   * Map entity field type to filter type
   */
  mapFieldTypeToFilterType(fieldType) {
    const mapping = {
      'string': 'text',
      'number': 'number',
      'date': 'date',
      'datetime': 'dateRange',
      'enum': 'enum',
      'boolean': 'boolean',
      'relation': 'relation'
    };
    return mapping[fieldType] || 'text';
  }

  /**
   * Convert entity to form schema
   */
  entityToFormSchema(entitySpec) {
    return {
      type: 'object',
      properties: entitySpec.fields.reduce((acc, field) => {
        acc[field.name] = {
          type: field.type,
          title: field.label || field.name,
          required: field.required || false
        };
        if (field.options) {
          acc[field.name].enum = field.options.map(opt => opt.value || opt);
        }
        return acc;
      }, {})
    };
  }

  /**
   * Get overview cards for detail view
   */
  getOverviewCards(entitySpec) {
    return (entitySpec.fields || [])
      .filter(field => field.ui?.overview !== false)
      .slice(0, 6)
      .map(field => ({
        label: field.label || field.name,
        field: field.name,
        format: field.format || field.type
      }));
  }

  /**
   * Get detail tabs
   */
  getDetailTabs(entitySpec) {
    const tabs = [
      {
        id: 'overview',
        label: 'Overview',
        type: 'fields'
      }
    ];

    // Add relation tabs
    (entitySpec.relations || []).forEach(relation => {
      tabs.push({
        id: relation.entity.toLowerCase(),
        label: relation.entity,
        type: 'relation',
        relation: relation.entity
      });
    });

    // Add activity tab
    tabs.push({
      id: 'activity',
      label: 'Activity',
      type: 'activity'
    });

    return tabs;
  }

  /**
   * Get detail actions
   */
  getDetailActions(entitySpec) {
    const actions = [];

    if (entitySpec.permissions?.edit) {
      actions.push({
        id: 'edit',
        label: 'Edit',
        variant: 'primary',
        permission: `${entitySpec.id}.edit`
      });
    }

    if (entitySpec.permissions?.delete) {
      actions.push({
        id: 'delete',
        label: 'Delete',
        variant: 'danger',
        permission: `${entitySpec.id}.delete`,
        confirm: {
          title: `Delete ${entitySpec.name}?`,
          message: 'This action cannot be undone.'
        }
      });
    }

    if (entitySpec.permissions?.export) {
      actions.push({
        id: 'export',
        label: 'Export',
        variant: 'secondary',
        permission: `${entitySpec.id}.export`
      });
    }

    return actions;
  }
}

export default ERPComposer;

