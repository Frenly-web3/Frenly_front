export interface IHint {
  id: number
  title: string
  category: {
    id: number
    title: string
  }
}

export interface ICondition {
  id: number
  title: string
}

export interface IRequirements {
  withExperience: {
    id: number
    title: string
    category: {
      id: number
      title: string
    }
  }[]
  withoutExperience: {
    id: number
    title: string
    category: {
      id: number
      title: string
    }
  }[]
}
