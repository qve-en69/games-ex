<template>
  <div class="card-body py-0">
    <form>
      <div class="form-row">
        <div class="col-12 mt-2 p-fluid">
          <div class="row">
            <div class="col-12 col-md-6 mt-3 p-fluid">
              <div class="p-float-label">
                <p>{{ $t('profile.general.name') }}</p>
                <InputText @input="$v.items.name.$touch()" type="text"
                           :class="{ 'is-invalid': $v.items.name.$dirty && $v.items.name.$invalid }"
                           v-model.trim="items.name"
                           class="p-form-control"
                />
                <div class="invalid-feedback invalid-input">
                          <span v-if="!$v.items.name.minLength">
                            {{ $t('profile.general.min_length') }}
                          </span>
                  <span v-else-if="!$v.items.name.required">
                            {{ $t('profile.general.enter_name ')}}
                          </span>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 mt-3 p-fluid">
              <div class="p-float-label">
                <p>{{ $t('profile.general.surname') }}</p>
                <InputText @input="$v.items.surname.$touch()" type="text"
                           :class="{ 'is-invalid': $v.items.surname.$dirty && $v.items.surname.$invalid }"
                           v-model.trim="items.surname"
                           class="p-form-control"
                />
                <div class="invalid-feedback invalid-input">
                        <span v-if="!$v.items.surname.minLength">
                          {{ $t('profile.general.min_length') }}
                        </span>
                  <span v-else-if="!$v.items.surname.required">
                          {{ $t('profile.general.enter_surname') }}
                        </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 mt-2 p-fluid">
          <div class="row">
            <div class="col-12 col-md-6 mt-3 p-fluid">
              <p>{{ $t('profile.general.birthday ')}}</p>
              <div class="p-float-label">
                <Calendar :touchUI="true" id="navigators" :monthNavigator="true" yearRange="1900:2021"
                          :yearNavigator="true" mask="99/99/9999"
                          :slotChar="($t('profile.general.slot_char_born'))"
                          v-model.trim="items.birthday"
                          class="p-form-control"
                          :placeholder="'ДД.ММ.ГГ'" :showIcon="false"/>
              </div>
            </div>

            <div class="col-12 col-md-6 mt-3 p-fluid">
              <p>{{ $t('profile.general.gender') }}</p>
              <div class="p-float-label">
                <Dropdown :options="genders" optionLabel="gender"
                          v-model="items.selectedGender"
                          class="p-form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 mt-2 p-fluid">
          <div class="row">
            <div class="col-12 col-md-6 mt-3 p-fluid">
              <p>{{ $t('profile.general.country') }}</p>
              <div class="p-float-label">
                <Dropdown :options="countries" optionLabel="country"
                          v-model="items.selectedCountry"
                          class="p-form-control"
                          p-dropdown-trigger=""
                />
              </div>
            </div>

            <div class="col-12 col-md-6 mt-3 p-fluid">
              <p>{{ $t('profile.general.city') }}</p>
              <div class="p-float-label">
                <Dropdown :options="cities" optionLabel="city"
                          v-model="items.selectedCity"
                          class="p-form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <Button @click.prevent="submitForm" class="col-12 justify-content-center mt-4 button-save">
          {{ $t('profile.general.button_save') }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  data: () => ({
    items: {
      name: '',
      surname: '',
      birthday: '',
      selectedGender: '',
      selectedCountry: '',
      selectedCity: ''
    },
    genders: [
      { gender: 'Мужской' },
      { gender: 'Женский' }
    ],
    countries: [
      { country: 'Russia' },
      { country: 'Usa' },
      { country: 'England' },
      { country: 'Irak' },
      { country: 'Iran' }
    ],
    cities: [
      { city: 'New York' },
      { city: 'Rome' },
      { city: 'London' },
      { city: 'Istanbul' },
      { city: 'Paris' }
    ]
  }),
  validations: {
    items: {
      name: {
        required,
        minLength: minLength(3)
      },
      surname: {
        required,
        minLength: minLength(3)
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      firstName: 'firstName',
      lastName: 'lastName'
    })
  },
  methods: {
    // ...mapActions('form', 'confirmEmail'),
    submitForm () {
      if (!this.validateDropdowns()) return

      if (!this.$v.$invalid) {
        this.$noty.success('success')
      } else {
        this.$noty.error(this.$t('profile.general.data_correctly'))
      }
    },
    validateDropdowns () {
      let validity = true
      switch (true) {
        case (!this.items.birthday):
          this.$noty.error(this.$t('profile.general.enter_birthday'))
          validity = false
          break
        case (!this.items.selectedGender):
          this.$noty.error(this.$t('profile.general.choose_gender'))
          validity = false
          break
        case (!this.items.selectedCountry):
          this.$noty.error(this.$t('profile.general.choose_country'))
          validity = false
          break
        case (!this.items.selectedCity):
          this.$noty.error(this.$t('profile.general.choose_city'))
          validity = false
          break
      }
      return validity
    }
  },
  created () {
    this.items.name = this.firstName
    this.items.surname = this.lastName
  }
}
</script>

<style scoped lang="scss">

::v-deep .p-datepicker-touch-ui, .p-calendar .p-datepicker-touch-ui  {
  min-width: 20vw !important;
}

::v-deep .p-inputtext {
  border-radius: 15px;
  background-color: #383A44;
}

::v-deep .p-inputtext::placeholder {
  color: #fff;
}
::v-deep .p-dropdown .p-dropdown-item {
  padding-left: 7px;
  font-size: 18px;
}
::v-deep .p-inputtext {
  font-size: 18px;
  padding-left: 7px;
}
::v-deep .p-dropdown .p-dropdown-trigger {
  display: none;
}

.form-row>.col, .form-row>[class*=col-] {
  padding-right: 0;
  padding-left: 0;
}
.p-inputtext {
  padding: 1.3rem 1.3rem 1.3rem 8px;
}

.invalid-input {
  position: absolute;
  z-index: 2;
  top: 100%;
  font-size: 13px;
  left: 10px;
}

.invalid-email {
  margin-left: 16px
}

@media (max-width: 600px) {
  .invalid-input {
    font-size: 12px;
  }
}

.invalid-feedback {
  margin-top: .07rem;
}

.p-form-control {
  border-radius: 15px;
  background-color: #383A44;
  height: 70px;
  font-size: 18px;
}

p {
  margin-bottom: 7px;
}

.button-save {
  height: 70px;
  border-radius: 15px;
}

</style>
