/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// @ts-check
import React from "react";
import ModalPicker from "../../../../ModalPicker";
import { createContainerFilter, createDRMFilter, createManifestFilter, createSourceFilter } from "./index";
import { FilterEnums, FilterLabels, filterBy, store, restore, filtersDefault } from "./FiltersSlice";
import StyledButton from "../../../../ModalPicker/StyledButton";
import { ContainerSvgIcon, DrmSvgIcon, ManifestSvgIcon, SourceSvgIcon } from "../../../../../helpers/SvgIcons";

function getFilterHandlers(filterValues) {
  const { manifestValue, drmValue, containerValue, srcValue } = filterValues;
  const filterHandlers = [];
  filterHandlers.push(createManifestFilter(manifestValue));
  filterHandlers.push(createDRMFilter(drmValue));
  filterHandlers.push(createContainerFilter(containerValue));
  filterHandlers.push(createSourceFilter(srcValue));
  return filterHandlers;
}

const FiltersPanel = function ({ isLeftBarOpen }) {
  const SRCValues = Object.values(FilterLabels.SRC);
  const DRMValues = Object.values(FilterLabels.DRM);
  const ContainerValues = Object.values(FilterLabels.Container);
  const ManifestsValues = Object.values(FilterLabels.Manifest);
  const initialValues = {
    SRC: SRCValues[0],
    DRM: DRMValues[0],
    Container: ContainerValues[0],
    Manifest: ManifestsValues[0],
  };

  const allFilters = restore();
  const selectedFilterValues = React.useRef(initialValues);

  React.useEffect(() => {
    setAllFiltersValues();
  }, []);

  function saveFilter(filters, value, filterOption) {
    const indexOfValue = Object.values(FilterLabels[filterOption]).indexOf(value);
    filters[filterOption] = Object.values(FilterEnums[filterOption])[indexOfValue];
  }

  function filterValue(filterOption, filterEnum) {
    const indexOfEnum = Object.values(FilterEnums[filterOption]).indexOf(filterEnum);
    console.log(`filter value: ${Object.values(FilterLabels[filterOption])[indexOfEnum]}`);
    return Object.values(FilterLabels[filterOption])[indexOfEnum];
  }

  function setAllFiltersValues() {
    setFilterValue(filterValue(filterBy.source, allFilters[filterBy.source]), filterBy.source);
    setFilterValue(filterValue(filterBy.drm, allFilters[filterBy.drm]), filterBy.drm);
    setFilterValue(filterValue(filterBy.manifest, allFilters[filterBy.manifest]), filterBy.manifest);
    setFilterValue(filterValue(filterBy.container, allFilters[filterBy.container]), filterBy.container);
  }

  function refreshAllFilters() {
    const filters = { ...allFilters };
    saveFilter(filters, selectedFilterValues.current.SRC, filterBy.source);
    saveFilter(filters, selectedFilterValues.current.DRM, filterBy.drm);
    saveFilter(filters, selectedFilterValues.current.Manifest, filterBy.manifest);
    saveFilter(filters, selectedFilterValues.current.Container, filterBy.container);
    store(filters);
  }

  function updateFilter(value, filterOption) {
    const indexOfValue = Object.values(FilterLabels[filterOption]).indexOf(value);
    selectedFilterValues.current[filterOption] = Object.values(FilterLabels[filterOption])[indexOfValue];
  }

  function setFilterValue(value, filterOption) {
    updateFilter(value, filterOption);
    refreshAllFilters();
  }

  return (
    <div className="filtering-options-container">
      <div className={`nonExpandBorder ${isLeftBarOpen ? "" : "hidden"}`}>
        <StyledButton
          buttonName="Clear Filters"
          label=""
          id="filter-option-list-clear"
          className={"center-btn leftBarElement btn-flex-right call-to-action-btn"}
          onClick={() => {
            selectedFilterValues.current = initialValues;
            store(filtersDefault);
          }}
        />
      </div>
      <ModalPicker
        icon={<SourceSvgIcon />}
        label="Source"
        navSectionName="filter-option-list-src"
        onSelectCallback={({ category }) => setFilterValue(category, filterBy.source)}
        initialLabel={selectedFilterValues.current.SRC}
        data={SRCValues}
      />
      <ModalPicker
        icon={<DrmSvgIcon />}
        label="DRM"
        navSectionName="filter-option-list-drm"
        onSelectCallback={({ category }) => setFilterValue(category, filterBy.drm)}
        initialLabel={selectedFilterValues.current.DRM}
        data={DRMValues}
      />
      <ModalPicker
        icon={<ContainerSvgIcon />}
        label="Container"
        navSectionName="filter-option-list-container"
        onSelectCallback={({ category }) => setFilterValue(category, filterBy.container)}
        initialLabel={selectedFilterValues.current.Container}
        data={ContainerValues}
      />
      <ModalPicker
        icon={<ManifestSvgIcon />}
        label="Manifest"
        navSectionName="filter-option-list-manifest"
        onSelectCallback={({ category }) => setFilterValue(category, filterBy.manifest)}
        initialLabel={selectedFilterValues.current.Manifest}
        data={ManifestsValues}
      />
    </div>
  );
};

export { FiltersPanel, getFilterHandlers };
