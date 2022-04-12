export class UpdateProfileDtoReq {
	id!: string
	industryId!: string
	positionId!: string
	cityId?: string
	fileId?: string 
	socialMediaId?: string
	fullName!: string
	companyName!: string
	phoneNumber!: string
	postalCode?: string
	version!: number
	isActive!: boolean
}

