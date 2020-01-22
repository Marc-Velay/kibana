/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect } from 'react';
import { EuiFormLabel, EuiSpacer } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { AggParamType, AggConfig } from '../../legacy_imports';
import { useSubAggParamsHandlers } from './utils';
import { AggParamEditorProps } from '../agg_param_props';
import { AggGroupNames } from '../../agg_groups';
import { DefaultEditorAggParams } from '../agg_params';

function SubMetricParamEditor({
  agg,
  aggParam,
  formIsTouched,
  metricAggs,
  state,
  setValue,
  setValidity,
  setTouched,
}: AggParamEditorProps<AggConfig, AggParamType>) {
  const metricTitle = i18n.translate('common.ui.aggTypes.metrics.metricTitle', {
    defaultMessage: 'Metric',
  });
  const bucketTitle = i18n.translate('common.ui.aggTypes.metrics.bucketTitle', {
    defaultMessage: 'Bucket',
  });
  const type = aggParam.name;

  const aggTitle = type === 'customMetric' ? metricTitle : bucketTitle;
  const aggGroup = type === 'customMetric' ? AggGroupNames.Metrics : AggGroupNames.Buckets;

  useEffect(() => {
    if (agg.params[type]) {
      setValue(agg.params[type]);
    } else {
      setValue(aggParam.makeAgg(agg));
    }
  }, []);

  const { onAggTypeChange, setAggParamValue } = useSubAggParamsHandlers(
    agg,
    aggParam,
    agg.params[type],
    setValue
  );

  if (!agg.params[type]) {
    return null;
  }

  return (
    <>
      <EuiSpacer size="m" />
      <EuiFormLabel>{aggTitle}</EuiFormLabel>
      <EuiSpacer size="s" />
      <DefaultEditorAggParams
        agg={agg.params[type]}
        groupName={aggGroup}
        className="visEditorAgg__subAgg"
        formIsTouched={formIsTouched}
        indexPattern={agg.getIndexPattern()}
        metricAggs={metricAggs}
        state={state}
        setAggParamValue={setAggParamValue}
        onAggTypeChange={onAggTypeChange}
        setValidity={setValidity}
        setTouched={setTouched}
      />
    </>
  );
}

export { SubMetricParamEditor };
