export class UpdateProfileDtoReq {
	id!: string
	userId!: string
	industryId!: string
	positionId!: string
	cityId?: string
	provinceId?:string
	fileId?: string 
	socialMediaId?: string
	fullName!: string
	companyName!: string
	phoneNumber!: string
	postalCode?: string
	version!: number
	isActive!: boolean
}

