const professionSpecialty = {
  default: [
    'Family & General Dentistry',
    'Anesthesiology',
    'Endodontics',
    'Oral & Maxillofacial Surgery',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
    'Radiology',
    'Other',
  ],
  dentist: [
    'Family & General Dentist',
    'Anesthesiologist',
    'Endodontist',
    'Oral & Maxillofacial Surgeon',
    'Orthodontist',
    'Pedodontist',
    'Periodontist',
    'Prosthodontist',
    'Radiologist',
    'Other',
  ],
}

export const professional = [
  {
    forceAllow: true,
    step: '1',
    nextStep: '2',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: false,
    title: 'Contact Information',
    sidebar: {
      title: 'Sign Up Today',
      subTitle: 'Professionals',
      description: 'and learn how to qualify for your free scrubs!',
      svg: 'shirt',
      order: ['subTitle', 'title', 'hr', 'description', 'svg'],
    },
    fields: [
      {
        fields: [
          {
            name: 'first_name',
            label: 'First Name',
            type: 'input',
            required: true,
          },
          {
            name: 'last_name',
            label: 'Last Name',
            type: 'input',
            required: true,
          },
        ],
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'input',
        formType: 'email',
        required: true,
        validation: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'input',
        formType: 'password',
        required: true,
        validation: 'password',
        subLabel: '( 8+ characters containing 6+ unique characters )',
      },
      {
        name: 'password_confirmation',
        label: 'Verify Password',
        type: 'input',
        formType: 'password',
        required: true,
        validation: 'passwordMatch',
      },
    ],
  },
  {
    step: '2',
    nextStep: '3',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: true,
    title: 'Address Information',
    sidebar: {
      title: '<strong>DayHire &trade;</strong>',
      description:
        'Never depend on an early morning phone call again. DayHire is a location based, on-demand hiring alternative to calling a temp agency.',
      svg: 'mobile',
      order: ['svg', 'title', 'description'],
    },
    fields: [
      {
        name: 'street',
        label: 'Street Address',
        type: 'input',
        required: true,
        validation: 'minChars3',
      },
      {
        name: 'city',
        label: 'City',
        type: 'input',
        required: true,
        validation: 'minChars3',
      },
      {
        name: 'state',
        label: 'State',
        type: 'dropdown',
        required: true,
        options: [
          { label: 'Alabama', value: 'AL' },
          { label: 'Alaska', value: 'AK' },
          { label: 'Arizona', value: 'AZ' },
          { label: 'Arkansas', value: 'AR' },
          { label: 'California', value: 'CA' },
          { label: 'Colorado', value: 'CO' },
          { label: 'Connecticut', value: 'CT' },
          { label: 'Delaware', value: 'DE' },
          { label: 'Florida', value: 'FL' },
          { label: 'Georgia', value: 'GA' },
          { label: 'Hawaii', value: 'HI' },
          { label: 'Idaho', value: 'ID' },
          { label: 'Illinois', value: 'IL' },
          { label: 'Indiana', value: 'IN' },
          { label: 'Iowa', value: 'IA' },
          { label: 'Kansas', value: 'KS' },
          { label: 'Kentucky', value: 'KY' },
          { label: 'Louisiana', value: 'LA' },
          { label: 'Maine', value: 'ME' },
          { label: 'Maryland', value: 'MD' },
          { label: 'Massachusetts', value: 'MA' },
          { label: 'Michigan', value: 'MI' },
          { label: 'Minnesota', value: 'MN' },
          { label: 'Mississippi', value: 'MS' },
          { label: 'Missouri', value: 'MO' },
          { label: 'Montana', value: 'MT' },
          { label: 'Nebraska', value: 'NE' },
          { label: 'Nevada', value: 'NV' },
          { label: 'New Hampshire', value: 'NH' },
          { label: 'New Jersey', value: 'NJ' },
          { label: 'New Mexico', value: 'NM' },
          { label: 'New York', value: 'NY' },
          { label: 'North Carolina', value: 'NC' },
          { label: 'North Dakota', value: 'ND' },
          { label: 'Ohio', value: 'OH' },
          { label: 'Oklahoma', value: 'OK' },
          { label: 'Oregon', value: 'OR' },
          { label: 'Pennsylvania', value: 'PA' },
          { label: 'Rhode Island', value: 'RI' },
          { label: 'South Carolina', value: 'SC' },
          { label: 'South Dakota', value: 'SD' },
          { label: 'Tennessee', value: 'TN' },
          { label: 'Texas', value: 'TX' },
          { label: 'Utah', value: 'UT' },
          { label: 'Vermont', value: 'VT' },
          { label: 'Virginia', value: 'VA' },
          { label: 'Washington', value: 'WA' },
          { label: 'West Virginia', value: 'WV' },
          { label: 'Wisconsin', value: 'WI' },
          { label: 'Wyoming', value: 'WY' },
        ],
      },
      {
        name: 'zip',
        label: 'Postal Code',
        type: 'input',
        formType: 'number',
        required: true,
        validation: 'minDigits5',
      },
    ],
  },
  {
    step: '3',
    nextStep: 'complete',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: true,
    title: 'Profession Information',
    sidebar: {
      title: '<strong>Work When you Want</strong>',
      titleSubLarge: 'Make What you Need',
      description:
        'Temping with StaffingDog is flexible and rewarding, helping dental professionals meet their career and financial goals.',
      svg: 'desktop_search',
      order: ['svg', 'title', 'subTitleLarge', 'description'],
    },
    fields: [
      {
        name: 'profession',
        label: 'Profession',
        type: 'dropdown',
        required: true,
        options: [
          'Dental Hygienist',
          'Dental Assistant',
          'Dentist',
          'Front Office',
          'Other',
        ],
      },
      {
        name: 'specialty',
        label: 'Specialty',
        type: 'dropdown',
        optionsByValue: {
          name: 'profession',
          options: {
            'Dental Hygienist': professionSpecialty.default,
            'Dental Assistant': professionSpecialty.default,
            Dentist: professionSpecialty.dentist,
            'Front Office': professionSpecialty.default,
            Other: professionSpecialty.default,
          },
        },
      },
      {
        name: 'availability',
        label: 'Availability',
        type: 'dropdown',
        options: [
          { value: 'All' },
          { value: 'Temporary' },
          { value: 'Full Time' },
          { value: 'Part Time' },
        ],
      },
    ],
  },
  {
    step: 'complete',
    complete: false,
    needsComplete: false,
    needsCompleteIfToken: false,
    title: 'Setup Complete',
  },
]

export const practice = [
  {
    forceAllow: true,
    step: '1',
    nextStep: '2',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: false,
    title: 'Account Information',
    sidebar: {
      title: 'Sign Up Today',
      subTitle: 'Dental Practice',
      description:
        'See how your office can cut hiring and recruiting costs by as much as 70% through our automated hiring network.',
      svg: 'computer',
      order: ['subTitle', 'title', 'svg', 'hr', 'description'],
    },
    fields: [
      {
        fields: [
          {
            name: 'first_name',
            label: 'First Name',
            type: 'input',
            required: true,
          },
          {
            name: 'last_name',
            label: 'Last Name',
            type: 'input',
            required: true,
          },
        ],
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'input',
        formType: 'email',
        required: true,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'input',
        formType: 'password',
        required: true,
        validation: 'password',
        subLabel: '( 8+ characters containing 6+ unique characters )',
      },
      {
        name: 'password_confirmation',
        label: 'Verify Password',
        type: 'input',
        formType: 'password',
        required: true,
        validation: 'passwordMatch',
      },
    ],
  },
  {
    step: '2',
    nextStep: '3',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: true,
    title: 'Practice Address',
    sidebar: {
      title: 'DayHire &trade;',
      description:
        'Never depend on an early morning phone call again. DayHire  is a location based, on-demand hiring alternative to calling a temp agency.',
      svg: 'mobile',
      order: ['svg', 'title', 'description'],
    },
    fields: [
      {
        name: 'street',
        label: 'Street Address',
        type: 'input',
        required: true,
        validation: 'minChars3',
      },
      {
        name: 'city',
        label: 'City',
        type: 'input',
        required: true,
        validation: 'minChars3',
      },
      {
        name: 'state',
        label: 'State',
        type: 'dropdown',
        required: true,
        options: [
          { label: 'Alabama', value: 'AL' },
          { label: 'Alaska', value: 'AK' },
          { label: 'Arizona', value: 'AZ' },
          { label: 'Arkansas', value: 'AR' },
          { label: 'California', value: 'CA' },
          { label: 'Colorado', value: 'CO' },
          { label: 'Connecticut', value: 'CT' },
          { label: 'Delaware', value: 'DE' },
          { label: 'Florida', value: 'FL' },
          { label: 'Georgia', value: 'GA' },
          { label: 'Hawaii', value: 'HI' },
          { label: 'Idaho', value: 'ID' },
          { label: 'Illinois', value: 'IL' },
          { label: 'Indiana', value: 'IN' },
          { label: 'Iowa', value: 'IA' },
          { label: 'Kansas', value: 'KS' },
          { label: 'Kentucky', value: 'KY' },
          { label: 'Louisiana', value: 'LA' },
          { label: 'Maine', value: 'ME' },
          { label: 'Maryland', value: 'MD' },
          { label: 'Massachusetts', value: 'MA' },
          { label: 'Michigan', value: 'MI' },
          { label: 'Minnesota', value: 'MN' },
          { label: 'Mississippi', value: 'MS' },
          { label: 'Missouri', value: 'MO' },
          { label: 'Montana', value: 'MT' },
          { label: 'Nebraska', value: 'NE' },
          { label: 'Nevada', value: 'NV' },
          { label: 'New Hampshire', value: 'NH' },
          { label: 'New Jersey', value: 'NJ' },
          { label: 'New Mexico', value: 'NM' },
          { label: 'New York', value: 'NY' },
          { label: 'North Carolina', value: 'NC' },
          { label: 'North Dakota', value: 'ND' },
          { label: 'Ohio', value: 'OH' },
          { label: 'Oklahoma', value: 'OK' },
          { label: 'Oregon', value: 'OR' },
          { label: 'Pennsylvania', value: 'PA' },
          { label: 'Rhode Island', value: 'RI' },
          { label: 'South Carolina', value: 'SC' },
          { label: 'South Dakota', value: 'SD' },
          { label: 'Tennessee', value: 'TN' },
          { label: 'Texas', value: 'TX' },
          { label: 'Utah', value: 'UT' },
          { label: 'Vermont', value: 'VT' },
          { label: 'Virginia', value: 'VA' },
          { label: 'Washington', value: 'WA' },
          { label: 'West Virginia', value: 'WV' },
          { label: 'Wisconsin', value: 'WI' },
          { label: 'Wyoming', value: 'WY' },
        ],
      },
      {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'input',
        formType: 'number',
        required: true,
        validation: 'minDigits5',
      },
    ],
  },
  {
    step: '3',
    nextStep: 'complete',
    complete: false,
    needsComplete: true,
    needsCompleteIfToken: true,
    title: 'Practice Information',
    sidebar: {
      title: 'Work When you Want',
      titleSubLarge: 'Make What you Need',
      description:
        'Temping with StaffingDog is flexible and rewarding, helping dental professionals meet their career and financial goals.',
      svg: 'desktop_search',
      order: ['svg', 'title', 'subTitleLarge', 'description'],
    },
    fields: [
      {
        name: 'practice_name',
        label: 'Practice Name',
        type: 'input',
        required: true,
      },
      {
        name: 'practice_type',
        label: 'Practice Type',
        type: 'dropdown',
        required: true,
        options: [
          { value: 'Single Practice' },
          { value: 'Multi Practice' },
          { value: 'School' },
          { value: 'Other' },
        ],
      },
      {
        fields: [
          {
            name: 'practice_first_name',
            label: 'First Name',
            type: 'input',
            required: true,
          },
          {
            name: 'practice_last_name',
            label: 'Last Name',
            type: 'input',
            required: true,
          },
        ],
      },
      {
        name: 'practice_email',
        label: 'Email Address',
        type: 'input',
        formType: 'email',
        required: true,
      },
    ],
  },
  {
    step: 'complete',
    complete: false,
    needsComplete: false,
    needsCompleteIfToken: false,
    title: 'Setup Complete',
  },
]

export default { professional, practice }
