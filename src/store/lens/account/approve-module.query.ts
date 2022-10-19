import { gql } from '@apollo/client'

export const APPROVE_MODULE = gql`
  query generateModuleCurrencyApprovalData($request: GenerateModuleCurrencyApprovalDataRequest!) {
    generateModuleCurrencyApprovalData(request: $request) {
      to
      from
      data
    }
  }
`
